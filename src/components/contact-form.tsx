"use client";
import { useState } from "react";
import { whatsapp } from "@/lib/site";
export function ContactForm() {
  const [brief, setBrief] = useState("");
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const message = `Olá, MOX.! Gostaria de conversar sobre um projeto.\n\nNome: ${d.get("name")}\nContato: ${d.get("contact")}\nSolução: ${d.get("service")}\nProjeto: ${d.get("project")}`;
        const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
        setBrief(url);
        window.open(url, "_blank", "noopener,noreferrer");
      }}
    >
      <p className="form-notice">
        Conte sobre o projeto. Ao continuar, abriremos o WhatsApp com sua
        mensagem preenchida para você revisar e enviar.
      </p>
      <label>
        Seu nome
        <input name="name" autoComplete="name" required maxLength={100} />
      </label>
      <label>
        E-mail ou telefone
        <input name="contact" autoComplete="email" required maxLength={150} />
      </label>
      <label>
        O que você precisa?
        <select name="service">
          <option>Quero entender a melhor solução</option>
          <option>Site institucional</option>
          <option>Landing page</option>
          <option>Sistema web</option>
          <option>Aplicativo mobile</option>
          <option>Automações e integrações</option>
          <option>Manutenção de site</option>
        </select>
      </label>
      <label>
        Conte um pouco sobre o projeto
        <textarea
          name="project"
          required
          minLength={20}
          maxLength={3000}
          rows={5}
        />
      </label>
      <button className="button" type="submit">
        Continuar no WhatsApp <span aria-hidden="true">↗</span>
      </button>
      {brief && (
        <div role="status" className="brief-result">
          <h2>Sua mensagem está pronta no WhatsApp.</h2>
          <p>
            Revise os dados e confirme o envio na conversa. Se a nova aba não
            abriu, use o link abaixo.
          </p>
          <a
            href={brief}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Abrir conversa no WhatsApp ↗
          </a>
        </div>
      )}
    </form>
  );
}
