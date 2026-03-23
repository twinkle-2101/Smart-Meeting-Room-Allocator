import java.util.*;

public class BookingRequest {
    int numberOfPeople;
    String timeSlot;
    List<String> requiredFacilities;
    String priority; // VIP or Normal

    public BookingRequest(int numberOfPeople, String timeSlot, List<String> requiredFacilities, String priority) {
        this.numberOfPeople = numberOfPeople;
        this.timeSlot = timeSlot;
        this.requiredFacilities = requiredFacilities;
        this.priority = priority;
    }
}
