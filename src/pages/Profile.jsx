import app_icon from "../assets/app_icon.png";

export default function Profile() {
  const concepts = [{
    title: "Concept 1",
    description: "Description for concept 1",
    imageUrl: app_icon
  },
  {
    title: "Concept 2",
    description: "Description for concept 2",
    imageUrl: app_icon
  }, {
    title: "Concept 3",
    description: "Description for concept 3",
    imageUrl: app_icon
  }];

  return (
    <>
      <div>
        <ul>
          <li>
            <img src={concepts[0].imageUrl} alt={concepts[0].title} />
            <h2>{concepts[0].title}</h2>
            <p>{concepts[0].description}</p>
          </li>
        </ul>
      </div>
    </>
  );
}