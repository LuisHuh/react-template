/**
 * @author Luis Enrique Huh Puc <luisenriquehuhpuc@hotmail.com>
 * @version v0.1.0
 * Vista previa de componentes del formulario.
 */

import React, { useState } from "react";
import { Cell, Grid } from "@components";
import {
	Form,
	CancelForm,
	SendForm,
	Input,
	InputEmail,
	InputNumber,
	InputCreditCard,
	InputPassword,
} from "@components/v2";

function send(fields) {
	console.log(fields);
}

function FormPreview() {
	const [fields, setFields] = useState({});
	const onChange = (e) => {
		const el = e.target;
		const myFields = { ...fields };
		myFields[el.name] = el.value;
		setFields(myFields);
	};

	return (
		<>
			<Grid type="x">
				<Cell>
					<h2>Without Form</h2>
					<h4>Required</h4>
					<p>Text</p>
					<Input
						name="tmpText"
						value={fields.tmpText}
						onChange={onChange}
						required
					/>
				</Cell>
				<Cell>
					<p>Text (No number)</p>
					<Input
						name="tmpOnlyText"
						disableNum
						value={fields.tmpOnlyText}
						onChange={onChange}
						required
					/>
				</Cell>
				<Cell>
					<p>Text (Caps lock)</p>
					<Input
						name="tmpCapsLock"
						enableCaps
						value={fields.tmpCapsLock}
						onChange={onChange}
						required
					/>
				</Cell>
				<Cell>
					<p>Number</p>
					<InputNumber
						name="tmpInputNumber"
						value={fields.tmpInputNumber}
						onChange={onChange}
						required
					/>
				</Cell>
				<Cell>
					<p>Number (Min:1 - Max: 50)</p>
					<InputNumber
						name="tmpMin_max"
						min="1"
						max="50"
						value={fields.tmpMin_max}
						onChange={onChange}
						required
					/>
				</Cell>
				<Cell>
					<p>Email</p>
					<InputEmail
						name="tmpEmail"
						value={fields.tmpEmail}
						onChange={onChange}
						required
					/>
				</Cell>
				<Cell>
					<p>Textarea</p>
					<Input
						name="tmpTextarea"
						type="textarea"
						value={fields.tmpTextarea}
						onChange={onChange}
						required
					/>
				</Cell>
				<Cell>
					<p>Password</p>
					<InputPassword
						name="tmpPassword"
						type="password"
						value={fields.tmpPassword}
						onChange={onChange}
						required
					/>
				</Cell>
				<Cell>
					<p>Credit card</p>
					<InputCreditCard
						name="tmpCreditCard"
						value={fields.tmpCreditCard}
						onChange={onChange}
						required
					/>
				</Cell>
			</Grid>
			<Form onSubmit={send}>
				<Grid type="x">
					<Cell>
						<h2>Form Preview</h2>
						<h4>No validation</h4>
						<p>Text</p>
						<Input name="text" />
					</Cell>
					<Cell>
						<p>Text (No number)</p>
						<Input name="onlyText" disableNum />
					</Cell>
					<Cell>
						<p>Text (Caps lock)</p>
						<Input name="capsLock" enableCaps />
					</Cell>
					<Cell>
						<p>Number</p>
						<InputNumber name="inputNumber" />
					</Cell>
					<Cell>
						<p>Number (Min:1 - Max: 50)</p>
						<InputNumber name="min_max" min="1" max="50" />
					</Cell>
					<Cell>
						<p>Email</p>
						<InputEmail name="email" />
					</Cell>
					<Cell>
						<p>Textarea</p>
						<Input name="textarea" type="textarea" />
					</Cell>
					<Cell>
						<p>Password</p>
						<InputPassword name="password" type="password" />
					</Cell>
					<Cell>
						<p>Credit card</p>
						<InputCreditCard name="creditCard" />
					</Cell>
					<Cell>
						<CancelForm>Cancel</CancelForm>
						<SendForm>Send</SendForm>
					</Cell>
				</Grid>
			</Form>
			<Form>
				<Grid type="x">
					<Cell>
						<h4>Required with validation</h4>
						<p>Text</p>
						<Input name="text" enableCaps required />
					</Cell>
					<Cell>
						<p>Text (No number)</p>
						<Input name="onlyText" disableNum required />
					</Cell>
					<Cell>
						<p>Number</p>
						<InputNumber name="inputNumber" required />
					</Cell>
					<Cell>
						<p>Number (Min:1 - Max: 50)</p>
						<InputNumber
							name="min_max"
							min="1"
							max="50"
							required
							validate
						/>
					</Cell>
					<Cell>
						<p>Email</p>
						<InputEmail name="email" required />
					</Cell>
					<Cell>
						<p>Textarea</p>
						<Input name="textarea" type="textarea" required />
					</Cell>
					<Cell>
						<p>Password</p>
						<InputPassword
							name="password"
							type="password"
							required
						/>
					</Cell>
					<Cell>
						<p>Credit card</p>
						<InputCreditCard name="creditCard" required />
					</Cell>
				</Grid>
			</Form>
		</>
	);
}

export default FormPreview;
