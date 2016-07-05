namespace <%= namespace %>
{
    using FluentValidation;

    public class PersonValidator : AbstractValidator<Person>
    {
        public PersonValidator()
        {
            this.RuleFor(x => x.Name).NotEmpty();
        }
    }
}
