const d = document,
    $table = d.querySelector('.crud-table'),
    $form = d.querySelector('.crud-form'),
    $title = d.querySelector('.crud-title'),
    $template = d.querySelector('.crud-template'),
    $fragment = d.createDocumentFragment();

const ajax = (options) => {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', e => {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            success(json);
        } else {
            let message = xhr.statusText || "Ocurrio un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    });
    xhr.open(method || "GET", url);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(JSON.stringify(data));
}
const getAll = () => {
    ajax({
        url: "http://localhost:5550/superheroes",
        success: (res) => {
            console.log(res);

            res.forEach(el => {
                $template.querySelector(".name").textContent = el.nombre;
                $template.querySelector(".origen").textContent = el.origen;
                $template.querySelector(".edit").dataset.id = el.id;
                $template.querySelector(".edit").dataset.name = el.nombre;
                $template.querySelector(".edit").dataset.origen = el.origen;
                $template.querySelector(".delete").dataset.id = el.id;

                let $clone = d.importNode($template, true);
                $fragment.appendChild($clone);
            });

            $table.querySelector("tbody").appendChild($fragment);
        },
        error: (err) => {
            console.log(err);
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        }
    })
}

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", e => {
    if (e.target === $form) {
        e.preventDefault();

        if (!e.target.id.value) {
            //Create - POST
            ajax({
                url: "http://localhost:5550/superheroes",
                method: "POST",
                success: (res) => location.reload(),
                error: (err) => $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
                data: {
                    nombre: e.target.nombre.value,
                    origen: e.target.origen.value
                }
            });
        } else {
            //Update - PUT
            ajax({
                url: `http://localhost:5550/superheroes/${e.target.id.value}`,
                method: "PUT",
                success: (res) => location.reload(),
                error: (err) => $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`),
                data: {
                    nombre: e.target.nombre.value,
                    origen: e.target.origen.value
                }
            });
        }
    }
});

d.addEventListener("click", e => {
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Super Heroe";
        $form.nombre.value = e.target.dataset.name;
        $form.origen.value = e.target.dataset.origen;
        $form.id.value = e.target.dataset.id;
    }

    if (e.target.matches(".delete")) {
        let isDelete = confirm(`¿Estás seguro de eliminar el id ${e.target.dataset.id}?`);

        if (isDelete) {
            //Delete - DELETE
            ajax({
                url: `http://localhost:5550/superheroes/${e.target.dataset.id}`,
                method: "DELETE",
                success: (res) => location.reload(),
                error: (err) => alert(err)
            });
        }
    }
})