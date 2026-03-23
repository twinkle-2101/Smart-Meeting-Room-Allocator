import java.util.*;

public class Room {
    String name;
    int capacity;
    List<String> facilities;
    List<String> availableSlots;

    public Room(String name, int capacity, List<String> facilities, List<String> availableSlots) {
        this.name = name;
        this.capacity = capacity;
        this.facilities = facilities;
        this.availableSlots = availableSlots;
    }

    public boolean isAvailable(String timeSlot) {
        return availableSlots.contains(timeSlot);
    }

    public boolean hasFacilities(List<String> requiredFacilities) {
        return facilities.containsAll(requiredFacilities);
    }

    @Override
    public String toString() {
        return name + " (Capacity: " + capacity + ", Facilities: " + facilities + ")";
    }
}