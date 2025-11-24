import useForm from "./useForm";

function Form() {
  const name = useForm("");
  const email = useForm("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name.value, email.value);
    name.reset();
    email.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input {...name} placeholder="Name"/>
      <input {...email} placeholder="Email"/>
      <button>Submit</button>
    </form>
  );
}
