const parse_date = (date) => date.split('/')[2];

const get_user_name = (field) => {
  const dog_index = field.indexOf('@');

  return field.slice(0, dog_index);
}

const username_regex = /[A-Za-z0-9]/g;

export default {
  check_empty_field(value) {
    return !value || value.length === 0
  },
  check_substring(value, substring) {
    return value.includes(substring);
  },
  check_dash_in_username(username) {
    return this.check_substring(username, '-') || this.check_substring(username, '_')
  },
  check_first_letter_in_username(username) {
    return !username_regex.test(username[0])
  },
  check_last_letter_in_username(username) {
    return !username_regex.test(username)
  },
  main_email_validation(value) {
    if(!this.check_substring(value, '@')) return true;
    const username = get_user_name(value);

    if(this.check_dash_in_username(username)) return true;
    // if(this.check_first_letter_in_username(username)) return true;
    // if(this.check_last_letter_in_username(username[username.length - 1])) return true;
    return false;
  },
  check_email_field(value) {
    const regex = !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/g.test(value));
    const check_user_name = this.main_email_validation(value);

    return regex || check_user_name
  },
  check_password_field(value) {
    if(value.length < 8) {
      return true;
    }

    let count = 0;

    // Spaces
    if(!/\s/g.test(value)) {
      count += 1;
    }

    // Uppercase
    if( /[A-Z]/.test(value) ) {
      count += 1;
    }

    // Lowercase
    if(/[a-z]/.test(value) ) {
      count += 1;
    }

    // Numbers
    if(/\d/.test(value)) {
      count += 1;
    }

    // Special chars
    if(!/\s/g.test(value) && /\W/.test(value)) {
      count += 1;
    }

    return count < 4;
  },
  confirm_password_field(current_value, main_value) {
    return current_value !== main_value
  },
  value_numbers_only(value) {
    return value.replace(/[^\d]/g, '');
  },
  clean_phone_value(value) {
    return value.replace(/[^\d\+\(\)]/g, '');
  },
  clear_email_field(value) {
    return value.replace(/[^\@\.\-_A-Za-z0-9]/g, '')
  },
  value_text_only(value) {
    return value.replace(/[^a-zа-яё\d]/ui, '');
  },
  check_card_year(value) {
    const parsed_year = parseInt(value.split('/')[1]);

    if(isNaN(parsed_year)) return true;

    const current_year = parseInt(new Date().getFullYear().toString().substr(2,2));

    return parsed_year < current_year;
  },
  check_select_empty(value, options) {
    return options.filter(el => value === el.placeholder).length === 0;
  },
  check_phone_number(value) {
    value = this.value_numbers_only(value);
    return value.length < 11;
  },
  check_month_day(value) {
    return value < 1 || value > 31
  },
  check_year(value) {
    const current_year = new Date().getFullYear();
    const max_year = current_year - 18;
    const min_year = current_year - 100;

    return value > max_year || value < min_year
  },
  check_month(value) {
    return value > 12 || value < 1;
  }
}
