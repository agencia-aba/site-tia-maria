// Plataforma de Pedidos — Tia Maria
// DADOS DE EXEMPLO (protótipo). Numa versão com backend, isso viria de um banco de dados.

const CATALOGO = [
  { id: 'bolo-trad-mb1', categoria: 'Bolos', nome: 'Bolo Decoração Tradicional — Abacaxi c/ creme Belga', preco: 77, tipoEstoque: 'encomenda', leadTimeDias: 2, img: '/site-tia-maria/assets/images/bolo-tradicional/05-2022/bolos-tradicionais1.jpg', desc: 'Massa branca, 10 pessoas, redondo.' },
  { id: 'bolo-choc-mb1', categoria: 'Bolos', nome: 'Bolo Decoração Tradicional — Massa de Chocolate', preco: 93, tipoEstoque: 'encomenda', leadTimeDias: 2, img: '/site-tia-maria/assets/images/bolo-tradicional/05-2022/bolos-tradicionais2.jpg', desc: '10 pessoas, redondo.' },
  { id: 'bolo-especial', categoria: 'Bolos', nome: 'Bolo Decoração Especial', preco: 102, tipoEstoque: 'encomenda', leadTimeDias: 5, img: '/site-tia-maria/assets/images/especiais-05-2022/decoracao-especial-01.jpg', desc: 'Acréscimo de R$25,00 sobre decoração tradicional.' },
  { id: 'bolo-personalizado', categoria: 'Bolos', nome: 'Bolo Decoração Personalizada', preco: 126, tipoEstoque: 'encomenda', leadTimeDias: 7, img: '/site-tia-maria/assets/images/bolos-personalizados/05-2022/personalizado1a.jpg', desc: '5 pessoas — arte personalizada sob consulta.' },
  { id: 'coxinha-25', categoria: 'Salgados', nome: 'Coxinha frita (25 un.)', preco: 26, tipoEstoque: 'pronta', img: '/site-tia-maria/assets/images/salgados-fritos.jpg', desc: 'Pronta entrega — retire ainda hoje.' },
  { id: 'salgado-congelado-25', categoria: 'Salgados', nome: 'Salgados fritos congelados (25 un.)', preco: 19, tipoEstoque: 'pronta', img: '/site-tia-maria/assets/images/salgados-fritos2.jpg', desc: 'É só aquecer no forno.' },
  { id: 'esfiha-25', categoria: 'Salgados', nome: 'Esfihas assadas (25 un.)', preco: 36, tipoEstoque: 'encomenda', leadTimeDias: 1, img: '/site-tia-maria/assets/images/esfihas2.jpg', desc: 'Carne, frango, calabresa ou queijo.' },
  { id: 'sanduiche-metro', categoria: 'Salgados', nome: 'Sanduíche de metro (70cm)', preco: 83, tipoEstoque: 'encomenda', leadTimeDias: 3, img: '/site-tia-maria/assets/images/metro.jpg', desc: 'Pedidos com 3 dias de antecedência.' },
  { id: 'brigadeiro-100', categoria: 'Docinhos', nome: 'Brigadeiro tradicional (cento)', preco: 112, tipoEstoque: 'encomenda', leadTimeDias: 1, img: '/site-tia-maria/assets/images/brigadeiro-copinho.jpg', desc: 'Brigadeiro, beijinho, bicho de pé ou branco.' },
  { id: 'cupcake-12', categoria: 'Docinhos', nome: 'Cupcakes tradicionais (12 un.)', preco: 90, tipoEstoque: 'pronta', img: '/site-tia-maria/assets/images/cup-cakes.jpg', desc: 'Chocolate, morango ou maracujá.' },
  { id: 'lua-de-mel', categoria: 'Docinhos', nome: 'Lua de Mel (unidade)', preco: 4, tipoEstoque: 'pronta', img: '/site-tia-maria/assets/images/lua-mel.jpg', desc: 'Creme ou doce de leite.' },
  { id: 'kit-casa-10', categoria: 'Kits Festa', nome: 'Kit Festa em Casa — 10 pessoas', preco: 468, tipoEstoque: 'encomenda', leadTimeDias: 3, img: '/site-tia-maria/assets/images/festa-em-casa/10-pessoas.jpg', desc: 'Bolo, docinhos, salgados, refrigerante e descartáveis.' },
  { id: 'kit-escola-15', categoria: 'Kits Festa', nome: 'Kit Festa na Escola — 15 crianças', preco: 457, tipoEstoque: 'encomenda', leadTimeDias: 3, img: '/site-tia-maria/assets/images/festa-escola/15-criancas.jpg', desc: 'Bolo, docinhos, salgados e refrigerante.' },
];

// CEPs de exemplo com distância aproximada até Jandira/SP (protótipo).
// Numa versão real, isso viria de uma API de geolocalização (ex: Google Distance Matrix) a partir do CEP.
const CEP_DISTANCIA_MOCK = {
  '06600': 3,   '06610': 5,   '06620': 6,   // Jandira
  '06696': 9,   // Vargem Grande Paulista
  '06700': 12,  '06709': 14, // Cotia
  '18135': 18,  // Ibiúna (parte)
  '06400': 22,  // Barueri
  '06300': 26,  // Carapicuíba
  '05000': 34,  // São Paulo (zona oeste)
  '01000': 42,  // São Paulo (centro)
};

function estimarDistanciaPorCep(cep) {
  const limpo = (cep || '').replace(/\D/g, '');
  const prefixo5 = limpo.slice(0, 5);
  if (CEP_DISTANCIA_MOCK[prefixo5] !== undefined) return CEP_DISTANCIA_MOCK[prefixo5];
  // fallback determinístico (simula variação) só para o protótipo
  const base = parseInt(limpo.slice(0, 2) || '0', 10);
  return 8 + (base % 35);
}

const PEDIDOS_EXEMPLO = [
  { id: '#1042', cliente: 'Marina Souza', itens: 'Bolo Decoração Tradicional + 100 Brigadeiros', total: 189, modo: 'entrega', status: 'novo', data: '2026-07-14' },
  { id: '#1041', cliente: 'Carlos Mendes', itens: 'Kit Festa em Casa — 20 pessoas', total: 805, modo: 'retirada', status: 'producao', data: '2026-07-13' },
  { id: '#1040', cliente: 'Juliana Alves', itens: 'Sanduíche de metro + Refrigerantes', total: 121, modo: 'retirada', status: 'pronto', data: '2026-07-12' },
  { id: '#1039', cliente: 'Roberto Lima', itens: 'Bolo Personalizado tema futebol', preco: 126, total: 151, modo: 'entrega', status: 'entregue', data: '2026-07-10' },
  { id: '#1038', cliente: 'Fernanda Dias', itens: '100 Coxinhas + 50 Bolinhos de queijo', total: 119, modo: 'retirada', status: 'entregue', data: '2026-07-09' },
  { id: '#1037', cliente: 'Marina Souza', itens: 'Cupcakes 24un + Docinhos de copinho', total: 387, modo: 'entrega', status: 'novo', data: '2026-07-15' },
];

const CLIENTES_EXEMPLO = [
  { nome: 'Marina Souza', telefone: '(11) 98888-1234', pedidos: 4, totalGasto: 812, ultimoPedido: '2026-07-15' },
  { nome: 'Carlos Mendes', telefone: '(11) 97777-5678', pedidos: 2, totalGasto: 1020, ultimoPedido: '2026-07-13' },
  { nome: 'Juliana Alves', telefone: '(11) 96666-9012', pedidos: 6, totalGasto: 1450, ultimoPedido: '2026-07-12' },
  { nome: 'Roberto Lima', telefone: '(11) 95555-3456', pedidos: 1, totalGasto: 151, ultimoPedido: '2026-07-10' },
  { nome: 'Fernanda Dias', telefone: '(11) 94444-7890', pedidos: 3, totalGasto: 402, ultimoPedido: '2026-07-09' },
];
