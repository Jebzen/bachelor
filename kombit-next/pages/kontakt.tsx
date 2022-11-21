import { client } from "../components/contenful/main";
import { IndexLayout } from "../layout";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Head from "next/head";

export default function Kontakt() {
	const form: any = useRef();

	const sendEmail = (e: any) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_96jb83y",
				"template_o8fqska",
				form.current,
				"JMbkZmQe-OiIyjo_l"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	};
	return (
		<>
			<Head>
				<title>Kontakt KOMBIT</title>
			</Head>
			<section className="container h-100">
				<h1>Kontaktformular</h1>
				<form ref={form} onSubmit={sendEmail}>
					<div className="mb-3">
						<label className="form-label">Navn</label>
						<input
							type="text"
							name="name"
							className="form-control"
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Email</label>
						<input
							type="email"
							name="email"
							className="form-control"
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Besked</label>
						<textarea name="message" className="form-control" />
					</div>
					<input
						type="submit"
						value="Send"
						className="btn btn-primary"
					/>
				</form>
			</section>
		</>
	);
}
