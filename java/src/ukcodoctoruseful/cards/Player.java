package ukcodoctoruseful.cards;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class Player
{

   private final String playerId;
   private double pot = 0.0;
   private List<Card> hand;

   public Player(Game game, String playerId)
   {
      this(game.getInitialStake(), playerId);
   }

   public Player(double initialStake, final String playerId)
   {
      this.pot += initialStake;
      this.playerId = playerId;
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
      return super.toString() + ":" + getPlayerId() + ":" + pot;
   }

   /**
    * @return the playerId
    */
   public String getPlayerId()
   {
      return playerId;
   }

}
