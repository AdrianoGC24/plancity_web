import API from "../../../lib/api";
import type {CreateEvent,UpdateEvent, EventResponse,} from "../../../types/events";

export const getEvents = async (): Promise<EventResponse[]> => {
  const response = await API.get<EventResponse[]>("/events");
  return response.data;
};

export const getEventById = async (id: string): Promise<EventResponse> => {
  const response = await API.get<EventResponse>(`/events/${id}`);
  return response.data;
};

export const createEvent = async (
  data: CreateEvent,
): Promise<EventResponse> => {
  const response = await API.post<EventResponse>("/events", data);
  return response.data;
};

export const updateEvent = async (
  id: string,
  data: UpdateEvent,
): Promise<EventResponse> => {
  const response = await API.patch<EventResponse>(`/events/${id}`, data);

  return response.data;
};
export const deleteEvent = async (id: string): Promise<void> => {
  await API.delete(`/events/${id}`);
};
