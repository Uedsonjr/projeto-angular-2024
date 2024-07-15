import Swal from 'sweetalert2';
import { profileForm } from '../interfaces/ProfileForm';

export function ValidateInputs(profile: profileForm) {
  const validTextPattern = /^[a-zA-Z]+$/;

  const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (profile.name === '') {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Name is empty',
      showConfirmButton: false,
      timer: 2000,
    });

    return null;
  }

  if (!validTextPattern.test(profile.name)) {
     Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Name is invalid',
      showConfirmButton: false,
      timer: 2000,
    });

    return null;
  }

  if (profile.role === '') {
     Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Role is empty',
      showConfirmButton: false,
      timer: 2000,
    });

    return null;
  }

  if (!validTextPattern.test(profile.role)) {
     Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Role is invalid',
      showConfirmButton: false,
      timer: 2000,
    });

    return null;
  }

  if (isNaN(profile.age)) {
     Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Age is empty',
      showConfirmButton: false,
      timer: 2000,
    });

    return null;
  }

  if (profile.age === null || profile.age === 0) {
     Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Age is invalid',
      showConfirmButton: false,
      timer: 2000,
    });

    return null;
  }

  if (profile.email === '') {
     Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Email is empty',
      showConfirmButton: false,
      timer: 2000,
    });

    return null;
  }

  if (!validEmailPattern.test(profile.email)) {
     Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Email is invalid',
      showConfirmButton: false,
      timer: 2000,
    });

    return null;
  }

  return true
}

export function ProfilesChanges(profile1: profileForm, profile2: profileForm) {
  return (
    profile1.name === profile2.name &&
    profile1.role === profile2.role &&
    profile1.age === profile2.age &&
    profile1.email === profile2.email &&
    profile1.isActive === profile2.isActive &&
    profile1.country === profile2.country &&
    profile1.experience === profile2.experience
  );
}
