export default function Contact(){
  const onSubmit = (e) => {
    e.preventDefault();
    alert("Заявка отправлена (демо). Подключим реальную отправку/CRM позже.");
  };
  return (
    <div className="section-narrow">
      <div className="container" data-anim="fade-up">
        <h2 style={{fontSize:28, fontWeight:800, margin:'0 0 16px'}}>Свяжитесь С Нами</h2>
        <form className="form" onSubmit={onSubmit}>
          <input className="input" placeholder="Имя" />
          <input className="input" placeholder="Телефон" />
          <input className="input" type="email" placeholder="Email" />
          <button className="button" type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
}
