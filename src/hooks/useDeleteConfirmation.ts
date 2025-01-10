import { useState, useCallback } from 'react';

// Function to generate a random keyword
function generateRandomKeyword() {
  const words = ['DELETE', 'REMOVE', 'CONFIRM', 'ERASE', 'DESTROY'];
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const word = words[Math.floor(Math.random() * words.length)];
  return `${word}-${randomNum}`;
}

export function useDeleteConfirmation() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [confirmationKeyword, setConfirmationKeyword] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [onConfirmDelete, setOnConfirmDelete] = useState<(() => void) | null>(null);

  const handleDelete = useCallback((name: string, onDelete: () => void) => {
    setItemToDelete(name);
    setOnConfirmDelete(() => onDelete);
    setConfirmationKeyword(generateRandomKeyword());
    setUserInput('');
    setShowDeleteConfirmation(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
    setOnConfirmDelete(null);
    setConfirmationKeyword('');
    setUserInput('');
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (userInput === confirmationKeyword && onConfirmDelete) {
      onConfirmDelete();
      handleCancelDelete();
    }
  }, [userInput, confirmationKeyword, onConfirmDelete, handleCancelDelete]);

  const handleInputChange = useCallback((value: string) => {
    setUserInput(value);
  }, []);

  return {
    showDeleteConfirmation,
    itemToDelete,
    confirmationKeyword,
    userInput,
    isValid: userInput === confirmationKeyword,
    handleDelete,
    handleCancelDelete,
    handleConfirmDelete,
    handleInputChange
  };
}