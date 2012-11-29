package ukcodoctoruseful.cards;

import ukcodoctoruseful.cards.event.CardsEvent;
import ukcodoctoruseful.cards.event.CardsEventListener;
import ukcodoctoruseful.cards.network.GameClient;


public class Croupier implements CardsEventListener
{

   Deck deck;
   GameClient gameClient;



   public Croupier()
   {
      deck = new Deck();
      deck.shuffle();
   }


   public void deal(Game game)
   {
      // TODO Auto-generated method stub

   }


   @Override
   public void handle(CardsEvent event)
   {
      // TODO Auto-generated method stub

   }
}
