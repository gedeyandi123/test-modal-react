import { useState } from "react";
import Modal1 from "../../components/Modal";
import Modal2 from "../../components/Modal2";

const longText = `Contrary to popular belief, Lorem Ipsum is not simply random text. It
has roots in a piece of classical Latin literature from 45 BC, making
it over 2000 years old. Richard McClintock, a Latin professor at
Hampden-Sydney College in Virginia, looked up one of the more obscure
Latin words, consectetur, from a Lorem Ipsum passage, and going
through the cites of the word in classical literature, discovered the
undoubtable source.`;

// CHOOSE OPTION 1 OR 2 FOR DIFFERENT STYLE FOR CREATE MODAL COMPONENT
const OPTION = 1;
// const OPTION = 2;

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <h1>Modal With React JS</h1>
      <button onClick={toggleModal}>Open Modal</button>

      {OPTION === 1 ? (
        <Modal1
          show={showModal}
          onClose={toggleModal}
          header={<h2>My Header</h2>}
          body={<p>{longText.repeat(100)}</p>}
          footer={<h3>My Footer</h3>}
        />
      ) : OPTION === 2 ? (
        <Modal2 show={showModal} onClose={toggleModal}>
          <Modal2.Header>{<h2>My Header</h2>}</Modal2.Header>
          <Modal2.Body>
            <p>{longText.repeat(50)}</p>
          </Modal2.Body>
          <Modal2.Footer>
            <Modal2.Footer.CloseBtn>Close</Modal2.Footer.CloseBtn>
          </Modal2.Footer>
        </Modal2>
      ) : null}

      <p>{longText.repeat(50)}</p>
    </>
  );
};

export default Home;
