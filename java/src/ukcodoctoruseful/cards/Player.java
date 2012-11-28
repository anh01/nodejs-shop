package ukcodoctoruseful.cards;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class Player
{

   private double pot = 0.0;
   private List<Card> hand;

   public Player(Game game)
   {
      this(game.getInitialStake());
   }

   public Player(double initialStake)
   {
      pot += initialStake;
      hand = new ArrayList<Card>();
   }

   public List<Card> fold(boolean show)
   {
      List<Card> lastHand = null;
      if (show)
      {
         lastHand = Collections.unmodifiableList(hand);
      }
      hand.clear();
      return lastHand;
   }

   public void see(double bet)
   {
      pot -= bet;
      return;
   }

   public void raise(double bet)
   {

   }

   public String toString()
   {
      return super.toString() + ":" + pot;
   }



}
