import React, { Dispatch } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
interface CreatePasswordProps {
    formData: { password: string; confirmPassword: string }
    setFormData: Dispatch<any>
    generateMnemonic: () => void
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
    formData,
    setFormData,
    generateMnemonic,
}) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFormData((pre: any) => ({ ...pre, [name]: value }))
    }
    return (
        <>
            <h1 className='text-center text-2xl font-semibold'>
                Create a password
            </h1>
            <p className='mt-1 text-base text-light-gray text-center'>
                You will use this to unlock your wallet.
            </p>

            <Input
                type='password'
                placeholder='Password'
                value={formData.password}
                name='password'
                onChange={onChangeHandler}
                className='mt-8 py-6 rounded-lg border-none bg-secondary text-white'
            />
            <Input
                type='password'
                placeholder='Confirm password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={onChangeHandler}
                className='py-6 mt-2 mb-6 rounded-lg border-none bg-secondary text-white'
            />
            {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                    <p className='text-red-500 mb-2 text-sm'>
                        Password and Confirm Password do not match
                    </p>
                )}
            <Button
                onClick={() => {
                    generateMnemonic()
                }}
                disabled={
                    !formData.password ||
                    formData.password !== formData.confirmPassword
                }
                className='w-full py-5 font-medium rounded-lg text-bg-color disabled:bg-secondary disabled:text-white/70'
            >
                Continue
            </Button>
        </>
    )
}

export default CreatePassword
