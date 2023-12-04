import { Card } from "../shared/card";
import './performanceCards.scss';



const PerformanceCards = () => {
    return (
        <div className="performanceCards">
            <Card>
                <>
                    <h2>Em Progresso</h2>
                    <p>Metric Card</p>
                </>
            </Card>
            <Card>
                <>
                    <h2>Em Progresso</h2>
                    <p>Metric Card</p>
                </>
            </Card>
            <Card>
                <>
                    <h2>Em Progresso</h2>
                    <p>Metric Card</p>
                </>
            </Card>
        </div>
    )
}

export { PerformanceCards };