-- Create a function to update multiple agent orders in a single transaction
CREATE OR REPLACE FUNCTION batch_update_agent_orders(
  agent_ids uuid[],
  new_orders integer[]
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validate arrays have same length
  IF array_length(agent_ids, 1) != array_length(new_orders, 1) THEN
    RAISE EXCEPTION 'Arrays must have same length';
  END IF;

  -- Update orders in a single transaction
  FOR i IN 1..array_length(agent_ids, 1) LOOP
    UPDATE agents 
    SET "order" = new_orders[i]
    WHERE id = agent_ids[i];
  END LOOP;
END;
$$;