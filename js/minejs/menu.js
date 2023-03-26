function menuOpciones(enlace){
    $.ajax({
        type:'GET',
        url:enlace,
        data:{},
        success:(datos) => {
            $('#contenido').html(datos)
        }
    })
}
