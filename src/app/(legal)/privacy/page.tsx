import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy and data handling practices",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including:
          </p>
          <ul>
            <li>Account information (name, email, password)</li>
            <li>Profile information you choose to provide</li>
            <li>Content you create, upload, or share</li>
            <li>Communications with us</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Protect against fraudulent or illegal activity</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share information:
          </p>
          <ul>
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>With service providers who assist our operations</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information, including encryption, secure connections, and access
            controls.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and data</li>
            <li>Export your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold">6. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:privacy@example.com" className="text-primary hover:underline">
              privacy@example.com
            </a>
          </p>
        </section>

        <div className="mt-12 rounded-lg border bg-muted/50 p-4 text-sm">
          <p className="font-medium">⚠️ Template Notice</p>
          <p className="text-muted-foreground">
            This is a template privacy policy. Have it reviewed by a legal
            professional before using in production.
          </p>
        </div>
      </div>
    </div>
  );
}
