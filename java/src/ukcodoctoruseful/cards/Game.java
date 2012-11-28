package ukcodoctoruseful.cards;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class Game
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
      game.play();

   }

   private void play()
   {
      croupier = new Croupier();
      players = new ArrayList<Player>();
      players.add(new Player(200.0));
      croupier.deal(this);
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
    * @param initialStake the initialStake to set
    */
   public void setInitialStake(double initialStake)
   {
      this.initialStake = initialStake;
   }


}
