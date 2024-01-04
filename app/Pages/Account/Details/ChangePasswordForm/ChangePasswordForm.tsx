import { withZod } from '@remix-validated-form/with-zod'
import type { FC } from 'react'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import { FormInput } from '~/components/Ui/Form/FormControl/ControlledInput/FormInput'
import { SubmitButton } from '~/components/Ui/Form/FormSubmit/FormSubmit'
import styles from "./styles.module.css"
export const passwordValidator = withZod(z.object({
	currentPassword: z.string().min(8),
	newPassword: z.string().min(8),
	confirmPassword: z.string().min(8),
	email: z.string().email()
}))
const ChangePasswordForm: FC<{ email: string }> = ({ email }) => {
	return (
		<ValidatedForm className={styles.form} validator={passwordValidator} method='post'>
			<div className={styles.wrapper}>
				<FormInput name='currentPassword' label='Current Password' placeholder='Current Password' type='password' />
				<FormInput name='newPassword' label='New Password' placeholder='New Password' type='password' />
				<FormInput name='confirmPassword' label='Confirm Password' placeholder='Confirm Password' type='password' />
				<FormInput type='hidden' name='email' value={email} />
			</div>

			<SubmitButton>
				Save
			</SubmitButton>
		</ValidatedForm>
	)
}

export default ChangePasswordForm