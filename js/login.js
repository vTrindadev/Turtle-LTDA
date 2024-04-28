document.getElementById("btn_entrar").addEventListener("click", function(event) {
    event.preventDefault(); // Evita o comportamento padrão do botão

    // Aqui você pode adicionar a lógica de autenticação
    // Por exemplo, verificar se o usuário e senha estão corretos

    // Redirecionar para outra página após o login
    window.location.href = "inicial.html";
});