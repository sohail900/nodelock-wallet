import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import bcrypt from 'bcryptjs'
import Crypto from 'crypto-js'

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

    // Encrypt the mnemonic seed
    async encryptMnemonic(mnemonic: string, password: string): Promise<string> {
        const seed = mnemonicToSeedSync(mnemonic).toString('hex') // Seed in hex format
        const hashPassword = await bcrypt.hash(password, 10)
        const key = this.deriveKey(hashPassword)
        localStorage.setItem('hash-token', hashPassword)
        // Encrypt the seed (convert hex to a WordArray first)
        return Crypto.AES.encrypt(Crypto.enc.Hex.parse(seed), key).toString()
    }

    // Decrypt the mnemonic seed
    async decryptMnemonic(
        encryptedMnemonic: string,
        password: string
    ): Promise<string> {
        const hashPassword = localStorage.getItem('hash-token')
        if (!hashPassword) throw new Error('key not found')
        if (!(await bcrypt.compare(password, hashPassword))) {
            throw new Error('Incorrect password')
        }
        const key = this.deriveKey(hashPassword) // Derive the same key
        // Decrypt the encrypted mnemonic
        const bytes = Crypto.AES.decrypt(encryptedMnemonic, key)
        // Convert decrypted data back to hex
        const decryptedSeed = Crypto.enc.Hex.stringify(bytes)
        if (!decryptedSeed) {
            throw new Error('Decryption failed. corrupted data.')
        }
        return decryptedSeed
    }
}
