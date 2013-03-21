package ukcodoctoruseful.cards;


public class Card
{
   public enum Suit
   {
      SPADE, HEART, DIAMOND, CLUB;
      public String toString()
      {
         return this.name().toLowerCase();
      }
   };

   public enum Value
   {
      ACE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING;

      public String toString()
      {
         return this.name().toLowerCase();
      }
   }

   private final Suit suit;
   private final Value value;

   public Card(Suit suit, Value value)
   {
      this.suit = suit;
      this.value = value;
   }

   public String toString()
   {
      return new StringBuilder(value.toString()).append(" of ").append(suit).append("s").toString();
   }

}
