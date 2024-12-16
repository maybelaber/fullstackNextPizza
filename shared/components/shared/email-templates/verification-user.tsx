import * as React from 'react'

interface IProps {
	code: string
}

export const VerificationUserTemplate: React.FC<Readonly<IProps>> = ({
	code,
}) => (
	<div>
		<p>
			Код подтверждения: <h2>{code}</h2>
		</p>

		<p>
			<a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
				Подтвердить регистрацию
			</a>
		</p>
	</div>
)