import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "../styles/home.scss";
import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.scss";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

/* 
<i class="bi bi-arrow-{direction}-short"></i>
<i class="bi bi-chevron-{direction}"></i>

<i class="bi bi-twitter"></i>
<i class="bi bi-facebook"></i>
<i class="bi bi-search"></i>
<i class="bi bi-file-earmark"></i>
<i class="bi bi-key"></i>
<i class="bi bi-lock"></i>
<i class="bi bi-check"></i>
<i class="bi bi-x"></i>
<i class="bi bi-cloud-upload"></i>
<i class="bi bi-cloud-download"></i>
<i class="bi bi-box-arrow-down"></i>
<i class="bi bi-trash"></i>
<i class="bi bi-mic"></i>
???
<i class="bi bi-voicemail"></i>
<i class="bi bi-patch-question"></i>
<i class="bi bi-clock"></i>
*/
