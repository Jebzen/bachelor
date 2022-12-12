import { client } from "../components/contenful/main";
import { IndexLayout } from "../layout";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Head from "next/head";
import PageHero from "../components/general/PageHero";

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
			<PageHero heading={"Kontakt os i dag"} />
			<section className="container section-container">
				<div className="flex-kontakt">
					<div className="kontakt-col1">
						<h1>Kontakt</h1>
						<p>
							Har du spørgsmål eller brug for at høre mere? Benyt dig af
							formularen her på siden eller vores kontaktoplysninger, og vi vil
							vende tilbage til dig hurtigst muligt.
						</p>
						<p>
							<b>KOMBIT A/S</b>
						</p>
						<p>
							Halfdansgade 8,
							<br />
							2300 København S
						</p>
						<p>
							Tlf:<a href="tel:33349400"> 3334 9400,</a> <br /> Mail:{" "}
							<a href="mailto:kombit@kombit.dk">kombit@kombit.dk</a>
						</p>

						<p>CVR: 19435075</p>
					</div>
					<div className="kontakt-col2">
						<h2>Kontaktformular</h2>
						<form ref={form} onSubmit={sendEmail} id="kontakt_formular">
							<div className="mb-3">
								<label className="form-label">Navn</label>
								<input type="text" name="name" className="form-control" />
							</div>
							<div className="mb-3">
								<label className="form-label">Email</label>
								<input type="email" name="email" className="form-control" />
							</div>
							<div className="mb-3 lastspan">
								<label className="form-label">Besked</label>
								<textarea name="message" className="form-control" rows={10} />
							</div>
							<input type="submit" value="Send" className="btn btn-primary" />
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
