import bcrypt from 'bcryptjs'
import Crypto from 'crypto-js'
import nacl from 'tweetnacl'
import { Keypair } from '@solana/web3.js'
import { Wallet, HDNodeWallet } from 'ethers'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import { Buffer } from 'buffer'
import { derivePath } from 'ed25519-hd-key'

interface WalletProps {
    accountIndex: number
    key: string
    encryptedSeeds: string
}

export class WalletService {
    private static instance: WalletService

    public static getInstance(): WalletService {
        if (!WalletService.instance) {
            WalletService.instance = new WalletService()
        }
        return WalletService.instance
    }

    // Generate a mnemonic
    generateMnemonic(): string {
        return generateMnemonic()
    }

    // Derive a consistent encryption key from the password
    private deriveKey(password: string): string {
        return Crypto.PBKDF2(password, 'some_salt', {
            keySize: 256 / 32,
            iterations: 1000,
        }).toString()
    }

    // Decrypt the mnemonic seed
    private decryptedSeed(encryptedSeed: string, password: string): string {
        if (!password || !encryptedSeed)
            throw new Error('Failed to generate keypair')
        // Derive the same key
        const key = this.deriveKey(password)
        // Decrypt seed
        const bytes = Crypto.AES.decrypt(encryptedSeed, key)
        // Convert decrypted data back to hex
        const decryptedSeed = Crypto.enc.Hex.stringify(bytes)
        if (!decryptedSeed) {
            throw new Error('Decryption failed. corrupted data.')
        }
        return decryptedSeed
    }

    // Encrypt the mnemonic seed
    async encryptMnemonic(
        mnemonic: string,
        password: string
    ): Promise<{ key: string; encryptedSeed: string }> {
        const seed = mnemonicToSeedSync(mnemonic).toString('hex') // Seed in hex format
        const hashPassword = await bcrypt.hash(password, 10)
        const key = this.deriveKey(hashPassword)

        // Encrypt the seed (convert hex to a WordArray first)
        const encryptedSeed = Crypto.AES.encrypt(
            Crypto.enc.Hex.parse(seed),
            key
        ).toString()
        return { key, encryptedSeed }
    }

    // Compare Password
    async comparePassword(
        encryptedMnemonic: string,
        password: string,
        key: string
    ): Promise<string> {
        if (!key) throw new Error('key not found')
        if (!(await bcrypt.compare(password, key))) {
            throw new Error('Incorrect password')
        }
        return this.decryptedSeed(encryptedMnemonic, password)
    }

    // Generate a sol keypair
    getSolanaWallet({ accountIndex, encryptedSeeds, key }: WalletProps): {
        privateKey: string
        publicKey: string
    } {
        const seed = this.decryptedSeed(encryptedSeeds, key)
        // solana derivation path
        const derivationPath = `m/44'/501'/${accountIndex}'/0'`
        // generate private key
        const derivePrivateKey = derivePath(derivationPath, seed).key

        // generate key pair
        const derivedKeyPair = Keypair.fromSecretKey(
            Buffer.from(nacl.sign.keyPair.fromSeed(derivePrivateKey).secretKey)
        )
        const privateKey = Buffer.from(derivedKeyPair.secretKey).toString('hex')
        const publicKey = derivedKeyPair.publicKey.toBase58()
        return { privateKey, publicKey }
    }
    // Generate a eth keypair
    getEthersWallet({ accountIndex, encryptedSeeds, key }: WalletProps): {
        privateKey: string
        address: string
    } {
        const seed = this.decryptedSeed(encryptedSeeds as string, key as string)
        // solana derivation path
        const derivationPath = `m/44'/60'/${accountIndex}'/0'`

        // convert seeds to unit8 array
        const seedBytes = new Uint8Array(Buffer.from(seed, 'hex'))

        const hdNode = HDNodeWallet.fromSeed(seedBytes)
        const derivedNode = hdNode.derivePath(derivationPath)
        const privateKey = derivedNode.privateKey

        // generate 20 bytes of public key
        const wallet = new Wallet(privateKey)

        // return public and private key
        return { privateKey, address: wallet.address }
    }
}
