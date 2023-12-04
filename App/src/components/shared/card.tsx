
interface IProps {
    children?: JSX.Element;
}

const Card = ({ children }: IProps) => {
    return (
        <div className="card">
            {children}
        </div>
    )
}

export { Card };