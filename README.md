# GETICOM - Grupo de Estudos em Tecnologias de Informação e Comunicações sem Fio
<p>Projeto de iniciação científica em Desenvolvimento Web utilizando as tecnologias JavaScript e ReactJS e banco de dados não relacional Firebase.</p>
<h2>Documentação</h2>
<ol>
  <li>
    Arquitetura:
    <p>O projeto GETICOM foi desenvolvido utilizando a SPA ReactJs e sua estrutura de pastas contém duas camadas: public e src.</p>
  </li>
  
  <li>
    Raíz do projeto:
    <p>Os arquivos contidos na raíz do projeto são arquivos de configurações. Entre eles estão o .env (responsável por atribuir as variáveis de ambiente, escondendo informações sensíveis da aplicação), .gitignore (aqui são definidos os arquivos os quais o git deve ignorar ao subir a aplicação para o github), package-lock.json e package.json (arquivos de configurações de dependências).</p>
  </li>
  
  <li>
    Pasta Public:
    <p>Contém os arquivos públicos como favicon e o index.html que será o responsável por orquestrar as rotas em uma única página (Single Page Appliction), através da div com id root.</p>
    <p>É no arquivo index.html que são especificados o título da aplicação, o favicon, links de importações do bootstrap, entre outros.</p>
  </li>
  
  <li>
    Pasta src:
    <p>Contém a organização de componentes, contextos, paginas, configurações de rotas, serviços, assets, além de arquivos de configuração e estilização de todos os componentes.</p>
  </li>
  
  <li>
    Pasta src/assets:
    <p>Aqui estão arquivos como imagens e o pdf do banner do curso de RF, e que podem ser importados nos componentes para serem utilizados.</p>
  </li>
  
  <li>
    Arquivo App.js:
    <p>É o principal componente da aplicação React, é responsável por orquestrar o que será renderizado no index.html. É exportado para o arquivo index.js.</p>
    <p>As tags <BrowserRouter> e <Routes /> são responsáveis por identificar e passar as rotas que estão configuradas no arquivo index.js da pasta routes para serem renderizados no index.html.</p>
    <p>A tag <ScrollToTop /> faz com que seja executada a função dentro deste componente, que é responsável por, ao trocar de rota, seja realizado o scroll para o topo da página.</p>
    <p>A tag <ToastContainer /> é responsável por renderizar os alerts personalizados da biblioteca toastify quando são acionados. Sem ele as mensagens dos alertas não aparecerão. Nota: faz necessário também o import 'import react-toastify/dist/ReactToastify.css' no nosso App.js, que é responsável por aplicar a estilização aos alertas.</p>
    <p>Já as tags <HighlightsProvider>, <ArticlesProvider> e <AuthProvider> são responsáveis por passar ao nosso componente principal os contextos dos provedores de destaques, artigos e autenticação, seguindo uma hierarquia.</p>
  </li>
  
  <li>
    Arquivo config.json:
    <p>Este é um arquivo de configurações em json que contém dados estáticos da nossa aplicação, que podem ser reutilizados em qualquer componente da aplicação ao serem importados, deixando assim os componentes mais limpos e com menos informações densas.</p>
  </li>
  
  <li>
    Arquivo index.css:
    <p>Este é o principal arquivo de estilização da aplicação, no qual toda e qualquer estilização aqui aplicada afeta todos os componetes. É exportado para o arquivo index.js</p>
  </li>
  
  <li>
    Arquivo index.js:
    <p>Arquivo responsável por renderizar o App.js e associá-lo à div de id root contida no index.html.</p>
  </li>
  
  <li>
    Arquivo setupTests.js:
    <p>Arquivo no qual são realizados os testes unitários da aplicação. Nesse caso não foram implementados nenhum teste ainda.</p>
  </li>
  
  <li>
    Pasta src/services:
    <p>O arquivo firebaseConnection.js nela contido é responsável por realizar a configuração de conexão com o banco de dados Firebase. São passados dados sensíveis vindos do arquivo .env responsáveis por realizar a conexão com o banco, como a chave da api, o domínio de autenticação, o id do projeto, entre outros (para mais detalhes, consultar a <a href="https://firebase.google.com/docs">documentação do firebase</a>).</p>
  </li>
 
 <li>
    Pasta src/routes:
    <p>Aqui estão dois arquivos de configurações de roteamento da aplicação.</p>
    <p>Route.js => responsável por realizar a configuração de rotas privadas, através da verificação se o usuário está logado (variável signed importada do AuthContext) e se a rota a qual ele está tentando acessar é privada ou não (propriedade isPrivate). O fluxo é seguido da segunite forma: se o usuário não estiver logado e estiver tentando acessar uma rota privada, é redirecionado para a rota "/admin/login" para realizar o login de administrador, já se o usuário estiver logado e tentando acessar uma rota pública, ele é redirecionado para a página principal da administração ("/admin") e deve realizar o logout para poder navegar nas demais rotas públicas.</p>
    <p>index.js => aqui são definidas as rotas e quais componetes cada rota deve renderizar, além também de definir quais rotas são privadas através da propriedade isPrivate. A rota cujo path é "*" equivale às rotas cujo caminho é inválido, e renderizam a página de NotFound.</p>
 </li>
 
 <li>
    Pasta src/contexts:
    <p>Aqui estão nossos contextos da aplicação, utilizados através da react hook useContext. Essa hook é utilizada quando se quer passar dados para vários componentes através de variáveis, sem a necessidade de passá-los como prop um por um, apenas importando os Contexts e utilizando a hook.</p>
    <p>a. Arquivo articles.js:</p>
    <p>No arquivo articles.js, são definidas duas variáveis de estado com a hook useState (articles, responsável por armazenar os artigos em uma lista, e loadingArticle, um booleano responsável por armazenar o estado se os artigos estão em processo de carregamento ou não. É utilizada a hook useEffect, que, ao ser carregada qualquer rota que tenha nosso contexto importado, vai executar a função loadArticles, que vai se conectar com o firebase, buscar na coleção de articles, ordenar os dados por data de criação em ordem decrescente, que são recebidos através do snapshot, e então adicionados à variável articles através do setArticles. Por fim, nosso provedor do contexto de artigos vai retornar as variáveis articles e loadingArticles para serem utilizadas nos componentes.</p>
    <p>b. Arquivo highlights.js:</p>
    <p>No arquivo highlights.js é realizado o mesmo script do articles.js, porém desta vez para os artigos, definindo as variáveis de estado que receberá a lista de destaques e a variável de estado de carregamento dos destaques. A lógica é basicamente a mesma, o useEffect será chamado em cada reload/renderização da página no qual o contexto foi importado e é feita a requisição ao banco, buscando na firestore a coleção de highlights e ordenando por data de criação de forma decrescente.</p>
    <p>c. Arquivo auth.js:</p>
    <p>Já no arquivo auth.js, são implementadas as funções responsáveis por logar, deslogar e registrar um administrador e verificar se o mesmo já está ou não logado. Para isso, são definidas 4 variáveis de estado, a primeira o user, responsável por armazenar os dados do usuário que está logado, a segunda a loadingAuth, responsável por guardar o estado de carregamento da autenticação, a terceira loadingSignOut, responsável por guardar o estado de carregamento de logout do usuário e a quarta a loading que guarda o estado de carregamento de verificação se o usuário está logado.</p>
    <p>Na função checkUser, o fluxo de verificação se o user está logado ocorre da seguinte forma: é utilizado o observador do firebase, o onAuthStateChanged, que verifica de forma assíncrona se há alguma alteração na autenticação, se houver um usuário logado, são recebidos os dados dele e armazenados na variável user, caso contrário, a variável user recebe null.</p>
    <p>Na função signIn é realizado o login do usuário seguindo o seguinte fluxo: é feito o login no firebase através do email e senha com o método signInWithEmailAndPassowrd do próprio firebase e que retorna as credenciais de login. A partir das credenciais de login, é verificado se o email do usuário já está verificado, e caso esteja é buscado os dados do usuário por id para armazenar na variável user, caso contrário, o usuário é deslogado e é reenviada a verificação de email para que o usuário possa realizar o login ao confirmá-la. Na estrutura catch são capturados os erros de login, entre eles: email não verificado, senha errada, email inválido e usuário não encontrado.</p>
    <p>Na função signOut, é realizado o logout do usuário no qual é feita a requisição chamando a função signOut do firebase e setando o usuário como null.</p>
    <p>Já a função signUp, é responsável por realizar o cadastro de um adminstrador, fornecendo email, senha e nome. O fluxo da função é o seguinte: é realizada a requisição através do método createUserWithEmailAndPassword do firebase, passando email e senha como parâmetros, para então realizar o armazenamento no banco na coleção de users e realizar o envio da verificação de e-mail e persistir o usuário deslogado, afim de que ele só consiga realizar o login após a verificação do email. Na estrrutura catch são capturados os erros de senha fraca, pois esta deve conter no mínimo 6 dígitos, email já em uso e email inválido.</p>
    <p>Para mais informações sobre autenticação com firebase, consultar a <a href="https://firebase.google.com/docs/auth/web/start">documentação</a>.</p>
 </li>
</ol>
