import React, { useState, useEffect } from "react";
import { Grid, Cell } from '../../components';
import ButtonsView from './tes_buttons';

function FormInput(props) {
	return (
		<Grid>
			<ButtonsView/>
			<div id="input" className="section scrollspy">
				<p className="caption">
					Forms are the standard way to receive user inputted data. The
					transitions and smoothness of these elements are very important
					because of the inherent user interaction associated with forms.
				</p>

				<h3 className="header">Input fields</h3>
				<p>
					Text fields allow user input. The border should light up simply
					and clearly indicating which field the user is currently editing.
					You must have a{" "}
					<code className=" language-markup">.input-group</code> div
					wrapping your input and label. This is only used in our Input and
					Textarea form elements.
				</p>
				<p>
					The validate className leverages HTML5 validation and will add a{" "}
					<code className=" language-markup">valid</code> and{" "}
					<code className=" language-markup">invalid</code> className
					accordingly. If you don't want the Green and Red validation
					states, just remove the{" "}
					<code className=" language-markup">validate</code> className from
					your inputs.
				</p>
				<br />
				<form>
					<Grid type="x" smallup="2" className="grid-margin-x">
						<Cell className="input-group">
							<input
								placeholder="Placeholder"
								id="first_name"
								type="text"
								className="validate"
							/>
							<label htmlFor="first_name" className="active">
								First Name
							</label>
						</Cell>
						<Cell className="input-group">
							<input id="last_name" type="text" />
							<label htmlFor="last_name">Last Name</label>
						</Cell>
					</Grid>
					<Grid type="x">
						<Cell className="input-group">
							<input
								disabled
								defaultValue="I am not editable"
								id="disabled"
								type="text"
								className="validate"
							/>
							<label htmlFor="disabled" className="active">
								Disabled
							</label>
						</Cell>
					</Grid>
					<Grid type="x">
						<Cell className="input-group">
							<input
								id="password"
								type="password"
								className="validate"
							/>
							<label htmlFor="password">Password</label>
						</Cell>
					</Grid>
					<Grid type="x">
						<Cell className="input-group">
							<input id="email" type="email" className="validate" />
							<label htmlFor="email">Email</label>
							<span
								className="helper-text"
								data-error="wrong"
								data-success="right">
								Helper text
							</span>
						</Cell>
					</Grid>
					<Grid type="x">
						<Cell>
							This is an inline input field:
							<div className="input-group inline">
								<input
									id="email_inline"
									type="email"
									className="validate"
								/>
								<label htmlFor="email_inline">Email</label>
								<span
									className="helper-text"
									data-error="wrong"
									data-success="right"></span>
							</div>
						</Cell>
					</Grid>
				</form>
				<br />
				<h5>Prefilling Text Inputs</h5>
				<p>
					If you are having trouble with the labels overlapping prefilled
					content, Try adding{" "}
					<code className=" language-markup">className="active"</code> to
					the label. <br />
					You can also call the function{" "}
					<code className=" language-javascript">
						M<span className="token punctuation">.</span>
						<span className="token function">updateTextFields</span>
						<span className="token punctuation">(</span>
						<span className="token punctuation">)</span>
						<span className="token punctuation">;</span>
					</code>{" "}
					to reinitialize all the Materialize labels on the page if you are
					dynamically adding inputs.
				</p>
				<Grid type="x" smallup="2" className="grid-margin-x">
					<Cell className="input-group">
						<input
							defaultValue="Alvin"
							id="first_name2"
							type="text"
							className="validate"
						/>
						<label className="active" htmlFor="first_name2">
							First Name
						</label>
					</Cell>
				</Grid>

				<br />

				<h5>Icon Prefixes</h5>
				<p>
					You can add an icon prefix to make the form input label even more
					clear. Just add an icon with the className{" "}
					<code className=" language-markup">prefix</code> before the input
					and label.
				</p>
				<br />
            <form>
               <Grid type="x" smallup="2" className="grid-margin-x">
                  <Cell className="input-group">
                     <i className="fas fa-user prefix"></i>
                     <input
                        id="icon_prefix"
                        type="text"
                        className="validate"
                     />
                     <label htmlFor="icon_prefix">First Name</label>
                  </Cell>
                  <Cell className="input-group">
                     <i className="fas fa-phone-alt prefix"></i>
                     <input
                        id="icon_telephone"
                        type="tel"
                        className="validate"
                     />
                     <label htmlFor="icon_telephone">Telephone</label>
                  </Cell>
               </Grid>
            </form>

				<br />

				<h5>Custom Error or Success Messages</h5>
				<p>
					You can add custom validation messages by adding either{" "}
					<code className=" language-markup">data-error</code> or{" "}
					<code className=" language-markup">data-success</code> attributes
					to your helper text element.
				</p>
				<br />
            <form className="col s12">
               <Grid type="x">
                  <Cell className="input-group">
                     <input id="email2" type="email" className="validate" />
                     <label htmlFor="email2">Email</label>
                     <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right">
                        Helper text
                     </span>
                  </Cell>
               </Grid>
            </form>
				<br />

				<h5>Changing colors</h5>
				<p>
					Here is a CSS template htmlFor modifying input fields in CSS.
					With Sass, you can achieve this by just changing a variable. The
					CSS shown below is unprefixed. Depending on what you use, you may
					have to change the type attribute selector.
				</p>
			</div>
			<div id="textarea" className="section scrollspy">
				<h3 className="header">Textarea</h3>
				<p>
					Textareas allow larger expandable user input. The border should
					light up simply and clearly indicating which field the user is
					currently editing. You must have a{" "}
					<code className=" language-markup">.input-group</code> div
					wrapping your input and label. This is only used in our Input and
					Textarea form elements.
				</p>
				<p>
					<strong>Textareas will auto resize to the text inside.</strong>
				</p>

            <form>
               <Grid type="x">
                  <Cell className="input-group">
                     <textarea
                        id="textarea1"
                        className="materialize-textarea"></textarea>
                     <label htmlFor="textarea1">Textarea</label>
                  </Cell>
               </Grid>
            </form>
				<p>
					advanced note: When dynamically changing the value of a textarea
					with methods like jQuery's{" "}
					<code className=" language-markup">.val()</code>, you must
					trigger an autoresize on it afterwords because .val() does not
					automatically trigger the events we've binded to the textarea.{" "}
				</p>

				<br />

				<h5>Icon Prefixes</h5>
				<p>
					You can add an icon prefix to make the form input label even more
					clear. Just add an icon with the className{" "}
					<code className=" language-markup">prefix</code> before the input
					and label.
				</p>
				<br />
            <form>
               <Grid type="x">
                  <Cell className="input-group">
                     <i className="fas fa-edit prefix"></i>
                     <textarea
                        id="icon_prefix2"
                        className="materialize-textarea"></textarea>
                     <label htmlFor="icon_prefix2"></label>
                  </Cell>
               </Grid>
            </form>
			</div>

			<div id="file" className="section scrollspy">
				<h3 className="header">File Input</h3>
				<p>
					If you want to style an input button with a path input we provide
					this structure.
				</p>
				<form action="#">
					<div className="file-input input-group">
						<div className="btn">
							<span>File</span>
							<input type="file" />
						</div>
						<div className="file-path-wrapper">
							<input className="file-path validate" type="text" />
						</div>
					</div>
				</form>

				<p>
					You can also use the{" "}
					<code className=" language-markup">multiple</code> attribute to
					allow multiple file uploads.{" "}
				</p>
				<form action="#">
					<div className="file-input input-group">
						<div className="btn">
							<span>File</span>
							<input type="file" multiple="" />
						</div>
						<div className="file-path-wrapper">
							<input
								className="file-path validate"
								type="text"
								placeholder="Upload one or more files"
							/>
						</div>
					</div>
				</form>
			</div>

			<div id="character-counter" className="section scrollspy">
				<h3 className="header">Character Counter</h3>
				<p className="caption">
					Use a character counter in fields where a character restriction
					is in place.
				</p>
            <form>
               <Grid type="x" smallup="2" className="grid-margin-x">
                  <Cell className="input-group">
                     <input id="input_text" type="text" data-length="10" />
                     <label htmlFor="input_text">Input text</label>
                     <span className="character-counter"></span>
                  </Cell>
               </Grid>
               <br />
               <Grid type="x">
                  <Cell className="input-group">
                     <textarea
                        id="textarea2"
                        className="materialize-textarea"
                        data-length="120"></textarea>
                     <label htmlFor="textarea2">Textarea</label>
                     <span className="character-counter"></span>
                  </Cell>
               </Grid>
            </form>
				<br />

				<h5>Initialization</h5>
				<p>
					There are no options htmlFor this plugin, but if you are adding
					these dynamically, you can use this to initialize them.
				</p>
			</div>
		</Grid>
	);
}

export default FormInput;
