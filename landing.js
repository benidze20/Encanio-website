document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const success = document.getElementById('newsletter-success');

  function validEmail(e){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    const email = emailInput.value.trim();
    if(!validEmail(email)){
      emailInput.classList.add('invalid');
      emailInput.focus();
      setTimeout(()=> emailInput.classList.remove('invalid'), 1400);
      return;
    }

    
    try{
      const list = JSON.parse(localStorage.getItem('encan_newsletter') || '[]');
      list.push({email: email, ts: Date.now()});
      localStorage.setItem('encan_newsletter', JSON.stringify(list));
    }catch(e){ }

    success.hidden = false;
    form.style.opacity = '0';
    setTimeout(()=> form.style.display = 'none', 220);

    setTimeout(()=>{
      success.hidden = true;
      form.reset();
      form.style.display = '';
      form.style.opacity = '';
    }, 3400);
  });

  
  const logos = document.querySelectorAll('.pre-footer .logo');
  if(logos.length){
    let idx = 0;
    setInterval(()=>{
      logos.forEach(l=> l.classList.remove('active'));
      logos[idx].classList.add('active');
      idx = (idx + 1) % logos.length;
    }, 2000);
  }

  // rotate testimonials
  const testimonials = document.querySelectorAll('.testimonial-card');
  if(testimonials.length){
    let t = 0;
    setInterval(()=>{
      testimonials.forEach(c=> c.classList.remove('active'));
      testimonials[t].classList.add('active');
      t = (t + 1) % testimonials.length;
    }, 4200);
  }

});
