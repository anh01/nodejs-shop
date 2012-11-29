package ukcodoctoruseful.cards;

public class PokerGame extends Game

{

   private double smallBlind;
   private double largeBlind = 2 * smallBlind;
   private Card[] theFlop;
   private Card theTurn;
   private Card theRiver;


   public PokerGame() {
	   super();
   }

   protected double getNextBetValue(long playId)
   {
      double nextBet = largeBlind;
      if (playId <= 0)
      {
         nextBet = smallBlind;
      }
      return nextBet;
   }

   /**
    * @return the theFlop
    */
   public Card[] getTheFlop()
   {
      return theFlop;
   }

   /**
    * @param theFlop
    *           the theFlop to set
    */
   public void setTheFlop(Card[] theFlop)
   {
      this.theFlop = theFlop;
   }

   /**
    * @return the theTurn
    */
   public Card getTheTurn()
   {
      return theTurn;
   }

   /**
    * @param theTurn
    *           the theTurn to set
    */
   public void setTheTurn(Card theTurn)
   {
      this.theTurn = theTurn;
   }

   /**
    * @return the theRiver
    */
   public Card getTheRiver()
   {
      return theRiver;
   }

   /**
    * @param theRiver
    *           the theRiver to set
    */
   public void setTheRiver(Card theRiver)
   {
      this.theRiver = theRiver;
   }

   public enum State
   {
      SETUP, ON_THE_FLOP, ON_THE_TURN, ON_THE_RIVER
   };


}
