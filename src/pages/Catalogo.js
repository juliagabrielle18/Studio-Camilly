import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Catalogo.css';

const imagens = [
{
    src: '/img/Fibra.jpg',
    titulo: 'Fibra de vidro',
    desc: 'Alongamento moldado com fibra de vidro sobre a unha natural.',
    preco: 'R$ 130,00',
  },
  {
    src: '/img/Manutencao.jpg',
    titulo: 'Manutenção',
    desc: 'Manutenção feita a cerca de 25 dias (dependendo do leito e crescimento).',
    preco: 'R$ 100,00',
  },
  {
    src: '/img/Esmaltacao.jpg',
    titulo: 'Esmaltação em gel (decoração)',
    desc: 'Técnica de esmaltação que favorece maior durabilidade (cerca de 20 dias).',
    preco: 'R$ 20,00',
  },
  {
    src: '/img/Blindagem.jpg',
    titulo: 'Blindagem',
    desc: 'Técnica de proteção com camadas de gel que fortalecem as unhas.',
    preco: 'R$ 75,00',
  },
  {
    src: '/img/Banho-de-gel.jpg',
    titulo: 'Banho em gel',
    desc: 'Cobertura que blinda e cria estrutura rígida sobre as unhas naturais.',
    preco: 'R$ 100,00',
  },
];

export default function Catalogo() {
  const navigate = useNavigate();

  const handleAgendar = (imagem) => {
    localStorage.setItem('imagemUnhaSelecionada', imagem);
    navigate('/agendamento');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Em telas menores, desativa o carrossel
        settings: 'unslick',
      },
    ],
  };

  return (
    <div className="catalogo-container">
      <h1 className="catalogo-titulo">Nosso Catálogo</h1>

      <div className="carousel">
        <Slider {...settings}>
          {imagens.map((item, index) => (
            <div className="carousel-item" key={index}>
              <div className="card">
                <img src={item.src} alt={item.titulo} />
                <h2>{item.titulo}</h2>
                <p>{item.desc}</p>
                <p>{item.preco}</p>
                <button onClick={() => handleAgendar(item.src)} className="botao-agendar">
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
