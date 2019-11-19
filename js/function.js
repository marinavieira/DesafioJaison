$(function () {
    var buscar = $('.js-input-usuario');
    var retorno = $("#retorno");
    var form = $(".js-form-busca");
    var botao = $ (".botao");
    var botao1 = $(".botao1");
    var botao2 = $(".botao2");
    
    //form.on('submit', false);
    form.on('submit', function(event){
        event.preventDefault();
    });
    botao.on('click', function () {
        $('#divretorno').removeClass("invisivel");
        $.ajax({
            url: "https://api.github.com/users/" + buscar.val()
        }).done(function (data) {
            console.log(data);

            var texto = "<h3 class='descricao'><b>" + data.name + "</b></h3>"
            texto += "<br /><img class='icone' src='" + data.avatar_url + "' alt='" + data.name + "' />"
            texto += `<br /><div class='descricao'><b>Localidade:</b> ${data.location} </div>`
            texto += `<br /><div class='descricao'><b>Número de repositórios:</b> ${data.public_repos}</div>`
            texto += `<br /><div class='descricao'><b>Número de Seguidores:</b> ${data.following} </div><br/><br/><br/><br/>`
            
            retorno.html(texto);
            getrepos(texto, buscar)
            getvisitados(texto, buscar)
            
        }).error(function () {
            retorno.text('Usuário não encontrado')
        }).always(function () {
            buscar.fadeIn();
        });
    });
          function getrepos(texto, buscar) {
                botao1.on('click', function () {
                $.ajax({
                    url: "https://api.github.com/users/" + buscar.val() + "/repos"
                }).done(function (data) {
                    console.log(data);
    
                    $.each(data, function (key, item) {
                        console.log(item);
    
                        texto += "<br/><a class='links' href='" + item.html_url + "'>" + item.name + "</a>"
                    });
                    retorno.html(texto);

                }).error(function () {
                    retorno.text('Esse usuário não possui repositórios')
                }).always(function () {
                    buscar.fadeIn();
                });
            });
        }
            function getvisitados(texto, buscar) {
            botao2.on('click', function () {
            $.ajax({
                url: "https://api.github.com/users/" + buscar.val() + "/starred"
            }).done(function (data) {
                console.log(data);

               $.each(data, function (key, item) {
                    console.log(item);

                   texto += "<br/><a class='links' href='" + item.clone_url + "'>" + item.full_name + "</a>"
                   texto += '<br/><img class="icone1" src="' + item.owner.avatar_url +'" />'
                });

                retorno.html(texto);

            }).error(function () {
                retorno.text('Não encontrado repositórios mais visitados')
            }).always(function () {
                buscar.fadeIn();
            });
        });
        
    }     
});
