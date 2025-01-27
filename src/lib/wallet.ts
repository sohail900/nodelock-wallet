import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import bcrypt from 'bcryptjs'
import * as Crypto from 'crypto-js'

export class WalletService {
    private static instance: WalletService
    public static getInstance(): WalletService {
        if (!WalletService.instance) {
            WalletService.instance = new WalletService()
        }
        return WalletService.instance
    }
    // generate mnemonic
    generateMnemonic(): string {
        return generateMnemonic()
    }
    // encrypt mnemonic with password
    async encryptMnemonic(mnemonic: string, password: string): Promise<string> {
        const seeds = mnemonicToSeedSync(mnemonic).toString('hex')
        const salt = bcrypt.genSaltSync(10) // Generate a salt
        const hashPassword = await bcrypt.hash(password, salt) // Hash the password
        return Crypto.AES.encrypt(seeds, hashPassword).toString()
    }

    // Decrypt the mnemonic
    async decryptMnemonic(
        encryptedMnemonic: string,
        password: string
    ): Promise<string> {
        const salt = bcrypt.genSaltSync(10) // Generate the same salt
        const hashPassword = await bcrypt.hash(password, salt) // Rehash the password
        const bytes = Crypto.AES.decrypt(encryptedMnemonic, hashPassword)
        return bytes.toString(Crypto.enc.Hex)
    }
}
