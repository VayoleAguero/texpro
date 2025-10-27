import { useState } from "react";

export default function ContactForm(){
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ name, phone, msg });
    alert("Спасибо! Мы свяжемся с вами.");
    setName(""); setPhone(""); setMsg("");
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
      />
      <input
        className="input"
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        required
      />
      <textarea
        className="input"
        rows="4"
        placeholder="Сообщение"
        value={msg}
        onChange={(e)=>setMsg(e.target.value)}
      />
      <button className="button" type="submit">Отправить</button>
    </form>
  );
}
