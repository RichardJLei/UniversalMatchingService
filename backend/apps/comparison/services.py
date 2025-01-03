from typing import Dict, Any, List
from .models import ComparisonModel
from apps.parsing.models import ParseResultModel

class ComparisonService:
    def compare_jsons(self, json1: Dict[str, Any], json2: Dict[str, Any]) -> Dict[str, Any]:
        """Compare two JSON structures and return differences"""
        # Future log: Starting JSON comparison
        
        differences = {
            'added': [],
            'removed': [],
            'modified': [],
            'match_percentage': 0.0
        }
        
        # Compare keys
        keys1 = set(json1.keys())
        keys2 = set(json2.keys())
        
        differences['added'] = list(keys2 - keys1)
        differences['removed'] = list(keys1 - keys2)
        
        # Compare values for common keys
        common_keys = keys1.intersection(keys2)
        for key in common_keys:
            if json1[key] != json2[key]:
                differences['modified'].append({
                    'key': key,
                    'value1': json1[key],
                    'value2': json2[key]
                })
        
        # Calculate match percentage
        total_keys = len(keys1.union(keys2))
        matching_keys = len(common_keys) - len(differences['modified'])
        differences['match_percentage'] = (matching_keys / total_keys) * 100 if total_keys > 0 else 0
        
        return differences
    
    def create_comparison(self, user_id: str, source_ids: List[str]) -> Dict[str, Any]:
        # Future log: Creating new comparison
        
        # Get parse results
        results = [ParseResultModel.get_parse_result(id) for id in source_ids]
        if None in results or len(results) != 2:
            raise ValueError("Invalid source IDs")
        
        # Compare JSONs
        comparison_result = self.compare_jsons(
            results[0]['parsed_data'],
            results[1]['parsed_data']
        )
        
        # Store comparison
        comparison_id = ComparisonModel.create_comparison(
            user_id,
            source_ids,
            comparison_result
        )
        
        return {
            'comparison_id': comparison_id,
            'result': comparison_result
        }

comparison_service = ComparisonService() 