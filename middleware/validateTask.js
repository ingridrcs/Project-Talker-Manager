const validationLogin = (req, res, next) => {
 const { email, password } = req.body;
 const validEmail = '^[A-Za-z0-9+_.-]+@(.+)$';
 if (!email) {
   return res.status(400).json({ message: 'O campo \'email\' é obrigatório' });
 }
 if (email !== validEmail) {
   return res.status(400).json({ message: 'O \'email\' deve ter o formato \'email@email.com\'' });
 }
 if (!password) {
   return res.status(200).json({ message: 'O campo \'password\' é obrigatório' });
 }
  if (password.length < 6) {
   return res.status(200).json({ message: 'O \'password\' deve ter pelo menos 6 caracteres' });
 }
 next();
}; 

module.exports = validationLogin;

// Source:https://www.alura.com.br/artigos/principais-casos-uso-regex-para-tratamento-dados#:~:text=Regex%2C%20abrevia%C3%A7%C3%A3o%20do%20ingl%C3%AAs%20Regular,como%20telefones%2C%20senhas%20e%20emails.