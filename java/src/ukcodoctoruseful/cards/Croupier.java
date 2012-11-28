package ukcodoctoruseful.cards;

public class Croupier
{

   Deck deck;



   public Croupier()
   {
      deck = new Deck();
      deck.shuffle();
      final Runnable dealer = new Runnable()
      {

         @Override
         public void run()
         {
            try
            {
               do
               {
                  showCard(deck.deal());
                  Thread.sleep(100);

               }
               while (true);
            }
            catch (InterruptedException e)
            {
               message(e.getMessage());
            }
            catch (EndOfDeckException e)
            {
               message("No more cards!");
            }
         }

         private void message(String message)
         {
            System.out.println(message);
         }

         private void showCard(final Card card)
         {
            message(String.valueOf(card));

         }
      };

      Thread t = new Thread(dealer);
      t.start();
   }


   public void deal(Game game)
   {
      // TODO Auto-generated method stub

   }
}
