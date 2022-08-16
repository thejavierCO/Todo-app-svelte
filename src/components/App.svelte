<script>
  import Main from "./Main.svelte";
  import Input from "./input.svelte";
  export let app;
  const data = ({ detail }) => {
    let [name, description, id] = detail.map((e) => ({
      [e.tag.className]: e,
      key: e.tag.className,
    }));
    let item = app.get(+id[id.key].value);
    let d = {
      name: name[name.key].value,
      description: description[description.key].value,
    };
    if (item) item.data = d;
    else app.add(d);
  };
  const mount = ({ detail }) => {
    let [name, description, id] = detail;
    id.value = app.data.length;
    id.tag.max = app.data.length;
    id.tag.min = 0;
    id.tag.addEventListener("change", ({ target }) => {
      const item = app.get(+target.value);
      if (item) {
        let { name: n, description: d } = item.data;
        name.value = n;
        description.value = d;
      } else {
        name.value = "";
        description.value = "";
      }
    });
    app.on("change", ({ detail: { add, del, item } }) => {
      if (add) {
        id.tag.max = add.length;
        id.value = add.length;
        name.value = "";
        description.value = "";
      }
    });
  };
</script>

<Main>
  <div slot="navbar">
    <div class="container">
      <h3>Todo app</h3>
    </div>
  </div>
  <div slot="content" class="col">
    <div class="row render">
      <Input on:data={data} on:mount={mount} />
    </div>
    <div class="row row-cols-4" />
  </div>
</Main>
