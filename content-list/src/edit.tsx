import { __ } from "@wordpress/i18n";

import { useBlockProps } from "@wordpress/block-editor";
import { Button } from "./components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

import "./editor.scss";

export default function Edit() {
	return (
		<div {...useBlockProps()} className="pure-form">
			<h3>Content List</h3>
			<div>
				<legend>A compact inline form</legend>
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Password" />
				<label for="default-remember">
					<input type="checkbox" id="default-remember" /> Remember me
				</label>
				<button type="submit" class="pure-button pure-button-primary">
					Sign in
				</button>
			</div>
		</div>
	);
}
