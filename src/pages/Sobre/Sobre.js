import React from 'react'
import '../../css/Sobre.css'

function Sobre() {
  return (
    <div>
      <div class="cabecalho">
        <div className='imagem'></div>
        <div class="sobreposicao"></div>
        <div class="texto">
          <h1>Sobre nós</h1>
        </div>
      </div>
      <div className='corpoSobre'>
        <div>
          <h1>Missão</h1>
          <p>
            Nossa missão é proporcionar acesso fácil e eficiente à
            correção de redações de alta qualidade, combinando
            tecnologia avançada com a expertise de profissionais
            qualificados. Buscamos não apenas corrigir erros
            gramaticais, mas também oferecer feedback construtivo e
            personalizado que promova o crescimento e aprimoramento
            contínuo das habilidades de escrita de nossos usuários.
            Nosso compromisso é capacitar cada escritor a alcançar
            seu máximo potencial, inspirando confiança e excelência
            em sua comunicação escrita.
          </p>
        </div>
        <div>
         <span>Desenvolvido por Yasmin Poleto Bido</span>
        </div>
      </div>
    </div>
  )
}

export default Sobre