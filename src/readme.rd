/* css global*/

.available-day {
    background-color: #b6e0c0 !important; /* Light green */
    color: #155724 !important;
    border-radius: 45px !important;
    padding: 1rem;
  }
  
  .unavailable-day {
    background-color: #f8f9fa !important; /* Gray */
    color: #6c757d !important;
    
  }
  
  .react-calendar{
    border: none !important;
    
  }
  
  .selected-day {
    background-color:  rgb(204,119,65) !important;
    border: 2px solid rgb(34,162,171) !important;
  
      color: #ffffff !important; /* Texto oscuro para el área clara del gradiente */
      font-weight: 800;
      font-size: 1.2rem;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transform: scale(1.2) !important;
      transition: background-color 0.5s ease-in-out;
  
  }
  .selected-unavailable-day{
    background: linear-gradient(
      to bottom right,
      rgba(29, 29, 29, 0.291),
      rgba(96, 64, 114, 0.444)
    ) !important;
    color: #333; /* Texto oscuro para el área clara del gradiente */
    font-weight: 600;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .selected-day:hover {
    background-color: rgb(199, 134, 94) !important;
    transform: scale(1.02);
  }