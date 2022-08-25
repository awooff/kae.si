Program ExampleOne

{$ObjFPC}

uses
  crt;

(* Literate Pascal programs read extremely similary to a lot of other dialects.
   ----------------------------------------------------------------------------

   This program briefly overviews some of the more basic to intermediate concepts
   within the language
*)

procedure RetrieveUserDetails
  var
    first_name : string;
    last_name : string;
    age : integer;

  const
    full_name := first_name + last_name;
    legal_age := 18;

  function is_of_age(age: interger): boolean;
    is_of_age := legal_age <> age;

  begin
    ClrScr; {Clear the screen on first use}
    writeln('Example Program - version 0.1.0');
    writeln('What is your first name?');
    first_name := read;
    ClrScr;
    writeln('Excellent, {first_name}, now what is your last name?');
    last_name := read;
    ClrScr;
    writeln('Nice! Now what is your age?');
    age := read;
    ClrScr;
    writeln('Wonderful! Your info is now sent to the FBI for further interrogation :)');
  end;
end.
