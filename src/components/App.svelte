<script>
  import Main from "./Main.svelte";
  import Task from "./task.svelte";
  export let app;
  /*
    let newTask = ({ detail: { id, name, description } }) => {
      id = +id;
      if (typeof id == "number") app.get(id).data = { name, description };
      else app.add({ name, description });
    };
    let delTask = ({ detail: a }) => {
      let { parent } = a;
      let id = parent.getAttribute("task");
      id = parseInt(id);
      app.del(id);
    };
    let update = (tag) => {
      app.data
      .map(
        (task) =>
        new Task({
          target: tag,
          props: {
            type: "print",
            task: task.data,
          },
        })
        )
        .map((e) => {
          e.$on("edit", edit);
          e.$on("delete", delTask);
        });
        app.on("change", ({ detail: { add: e } }) => {
          if (e) {
            tag.innerHTML = "";
            e.map(
              (task) =>
              new Task({
                target: tag,
                props: {
                  type: "print",
                  task: task.data,
                },
              })
          ).map((e) => {
            e.$on("edit", edit);
            e.$on("delete", delTask);
          });
        }
      });
    };
  */
  const edit = ({ detail: a }) => {
    let { parent } = a;
    let controlId = document
      .querySelector("#newTask")
      .querySelector(".idNewTask");
    let controlName = document
      .querySelector("#newTask")
      .querySelector(".nameNewTask");
    let controlDescription = document
      .querySelector("#newTask")
      .querySelector(".descriptionNewTask");
    let id = parent.getAttribute("task");
    let name = parent.querySelector(".name").textContent;
    let description = parent.querySelector(".description").textContent;
    id = parseInt(id);
    controlId.value = id;
    controlName.value = name;
    controlDescription.value = description;
  };
  const newTask = ({ detail: { id, name, description } }) => {
    let task = app.get(id);
    if (task) {
      task.data = { id, name, description };
    } else app.add({ id, name, description });
  };

  const delTask = ({ detail: a }) => {
    let { parent } = a;
    let id = parent.getAttribute("task");
    id = parseInt(id);
    app.del(id);
  };
  const update = (tag) => {
    app.data
      .map(
        (task) =>
          new Task({
            target: tag,
            props: {
              type: "print",
              task: task.data,
            },
          })
      )
      .map((e) => {
        e.$on("edit", edit);
        e.$on("delete", delTask);
      });
    app.on("change", ({ detail: { add, del } }) => {
      if (add || del) {
        tag.innerHTML = "";
        (add || del)
          .map(
            (task) =>
              new Task({
                target: tag,
                props: {
                  type: "print",
                  task: task.data,
                },
              })
          )
          .map((e) => {
            e.$on("edit", edit);
            e.$on("delete", delTask);
          });
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
      <Task type="input" task={app} on:new={newTask} />
    </div>
    <div class="row row-cols-4" use:update />
  </div>
</Main>
