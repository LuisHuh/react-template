import React from "react";
import { Grid, Button, LinkButton, Cell, CloseButton } from "../../components";

function ButtonView(props) {
	return (
		<Grid type="x">
			<Cell className="large-9 columns docs-component-inner" id="docs">
				<h1 className="docs-page-title">Button</h1>
				<hr/>
				<h2>
					Basics
				</h2>
				<div>

					<div className="docs-code-live">
						<LinkButton href="about.html">
							Learn More
						</LinkButton>
						<LinkButton href="#features" >
							View All Features
						</LinkButton>
						<Button className="success">
							Save
						</Button>
						<Button className="alert">
							Delete
						</Button>
					</div>
					<hr />
					<h2
						id="sizing"
						className="docs-heading"
						data-magellan-target="sizing">
						Sizing
						<a className="docs-heading-icon" href="#sizing"></a>
					</h2>

					<div className="docs-code-live">
						<LinkButton className="tiny" href="#">
							So Tiny
						</LinkButton>
						<LinkButton className="small" href="#">
							So Small
						</LinkButton>
						<LinkButton href="#">
							So Basic
						</LinkButton>
						<LinkButton className="large" href="#">
							So Large
						</LinkButton>
						<LinkButton className="expanded" href="#">
							Such Expand
						</LinkButton>
						<LinkButton className="small expanded" href="#">
							Wow, Small Expand
						</LinkButton>
					</div>
					<h3>
						Responsive Expanded buttons
					</h3>
					<div className="docs-code-live">
						<LinkButton className="small small-only-expanded" href="#">
							Wow, Expand only on small viewport
						</LinkButton>
						<LinkButton className="small medium-only-expanded" href="#">
							Expand only on medium viewport
						</LinkButton>
						<LinkButton className="small large-only-expanded" href="#">
							Expand only on large viewport
						</LinkButton>

						<LinkButton className="small medium-expanded" href="#">
							Wow, Expand on medium and larger
						</LinkButton>
						<LinkButton className="small large-expanded" href="#">
							Expand on large and larger
						</LinkButton>

						<LinkButton className="small medium-down-expanded" href="#">
							Expand on medium and smaller
						</LinkButton>
						<LinkButton className="small large-down-expanded" href="#">
							Expand on large and smaller
						</LinkButton>
					</div>
					<hr />
					<h2>
						Coloring
					</h2>
					<div className="docs-code-live">
						<LinkButton className="primary" href="#">
							Primary
						</LinkButton>
						<LinkButton className="secondary" href="#">
							Secondary
						</LinkButton>
						<LinkButton className="success" href="#">
							Success
						</LinkButton>
						<LinkButton className="alert" href="#">
							Alert
						</LinkButton>
						<LinkButton className="warning" href="#">
							Warning
						</LinkButton>
					</div>
					<hr />
					<h2>
						Hollow Style
					</h2>
					<div className="docs-code-live">
						<Button className="hollow" href="#">
							Primary
						</Button>
						<Button className="hollow secondary" href="#">
							Secondary
						</Button>
						<Button className="hollow success" href="#">
							Success
						</Button>
						<Button className="hollow alert" href="#">
							Alert
						</Button>
						<Button className="hollow warning" href="#">
							Warning
						</Button>
						<Button className="hollow" href="#" disabled>
							Disabled
						</Button>
					</div>
					<hr />
					<h2>
						Disabled Buttons
					</h2>
					<div className="docs-code-live">
						<LinkButton className="disabled" href="#">
							Disabled
						</LinkButton>
						<Button className="primary" disabled>
							Disabled
						</Button>
						<Button className="secondary" disabled>
							Disabled
						</Button>
						<Button className="success" disabled>
							Disabled
						</Button>
						<Button className="alert" disabled>
							Disabled
						</Button>
						<Button className="warning" disabled>
							Disabled
						</Button>
					</div>
					<div className="docs-code-live">
						<LinkButton className="hollow disabled" href="#">
							Disabled
						</LinkButton>
						<Button className="hollow primary" disabled>
							Disabled
						</Button>
						<Button className="hollow secondary" disabled>
							Disabled
						</Button>
						<Button className="hollow success" disabled>
							Disabled
						</Button>
						<Button className="hollow alert" disabled>
							Disabled
						</Button>
						<Button className="hollow warning" disabled>
							Disabled
						</Button>
					</div>
					<hr />
					<h2>
						Clear Style
					</h2>
					<div className="docs-code-live">
						<LinkButton className="clear" href="#">
							Primary
						</LinkButton>
						<LinkButton className="clear secondary" href="#">
							Secondary
						</LinkButton>
						<LinkButton className="clear success" href="#">
							Success
						</LinkButton>
						<LinkButton className="clear alert" href="#">
							Alert
						</LinkButton>
						<LinkButton className="clear warning" href="#">
							Warning
						</LinkButton>
						<LinkButton className="clear" href="#" disabled>
							Disabled
						</LinkButton>
					</div>
					<p>
						This is especially useful as a secondary action button. This
						way you get proper spacing and line-height. Example:
					</p>

					<Button className="primary" href="#">
						Primary Action
					</Button>
					<Button className="clear" href="#">
						Secondary Action
					</Button>

					<hr />
					<h2>
						Dropdown Arrows
					</h2>
					<p>
						Add a dropdown arrow to your button.
					</p>

					<div className="docs-code-live">
						<Button className="dropdown tiny">
							Dropdown Button
						</Button>
						<Button className="dropdown small">
							Dropdown Button
						</Button>
						<Button className="dropdown">Dropdown Button</Button>
						<Button className="dropdown large">
							Dropdown Button
						</Button>
						<Button className="dropdown expanded">
							Dropdown Button
						</Button>
					</div>
					<hr />
					<h2>
						Accessibility
					</h2>
					<div className="docs-code-live">
						<CloseButton>Close</CloseButton>
					</div>
				</div>
			</Cell>
		</Grid>
	);
}

export default ButtonView;
