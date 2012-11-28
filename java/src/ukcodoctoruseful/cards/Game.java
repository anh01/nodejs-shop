package ukcodoctoruseful.cards;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import ukcodoctoruseful.cards.event.CardsEvent;
import ukcodoctoruseful.cards.event.CardsEventListener;


public class Game implements CardsEventListener
{
   private Croupier croupier;
   private List<Player> players;
   private Pot pot;
   private double initialStake;

   /**
    * @param args
    */
   public static void main(String[] args)
   {
      final Game game = new PokerGame();
      game.play(Double.parseDouble(args[0]));

   }

   private void play(double initialStake)
   {
      croupier = new Croupier();
      setInitialStake(initialStake);
      players = new ArrayList<Player>();
      waitForPlayers();
      croupier.deal(this);
   }

   private void waitForPlayers()
   {
      // TODO Auto-generated method stub

   }

   public List<Player> getPlayers()
   {
      return Collections.unmodifiableList(players);
   }

   /**
    * @return the initialStake
    */
   public double getInitialStake()
   {
      return initialStake;
   }

   /**
    * @param initialStake
    *           the initialStake to set
    */
   public void setInitialStake(double initialStake)
   {
      this.initialStake = initialStake;
   }

   @Override
   public void handle(CardsEvent event)
   {

   }


}
