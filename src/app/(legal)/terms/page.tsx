import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using our service",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our service, you agree to be bound by these Terms of Service. If
            you do not agree to these terms, do not use our service.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">2. Description of Service</h2>
          <p>
            We provide a web-based application that allows you to [describe your service]. We
            reserve the right to modify, suspend, or discontinue the service at any time.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">3. User Accounts</h2>
          <p>To use our service, you must:</p>
          <ul>
            <li>Create an account with accurate information</li>
            <li>Maintain the security of your password</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized access</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit harmful or malicious content</li>
            <li>Attempt to gain unauthorized access</li>
            <li>Interfere with the proper functioning of the service</li>
            <li>Use the service for any illegal purpose</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
          <p>
            The service and its content are protected by copyright, trademark, and other laws. You
            may not copy, modify, or distribute our content without permission.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">6. User Content</h2>
          <p>
            You retain ownership of content you submit. By submitting content, you grant us a
            license to use, store, and display it as necessary to provide the service.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">7. Termination</h2>
          <p>
            We may terminate or suspend your account at any time for violations of these terms. Upon
            termination, your right to use the service ceases immediately.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">8. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM
            ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A
            PARTICULAR PURPOSE.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">9. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">10. Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of the service after changes
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">11. Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at:{" "}
            <a href="mailto:legal@example.com" className="text-primary hover:underline">
              legal@example.com
            </a>
          </p>
        </section>

        <div className="bg-muted/50 mt-12 rounded-lg border p-4 text-sm">
          <p className="font-medium">⚠️ Template Notice</p>
          <p className="text-muted-foreground">
            This is a template terms of service. Have it reviewed by a legal professional before
            using in production.
          </p>
        </div>
      </div>
    </div>
  );
}
