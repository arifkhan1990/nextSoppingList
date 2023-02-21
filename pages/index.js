import ShoppingList from '../components/ShoppingList';
import ItemModal from '../components/ItemModal';
import { Container } from 'reactstrap';
export default function Home() {
  return (
    <main>
      <Container>
        {/* <ItemModal /> */}
        <ShoppingList />
      </Container>
    </main>
  );
}
